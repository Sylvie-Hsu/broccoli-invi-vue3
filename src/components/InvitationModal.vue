<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormRules, FormItemRule, FormItemInst, FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import axios from 'axios'
interface FormType {
    name: string | null
    email: string | null
    reenteredEmail: string | null
}

const props = defineProps(['showModal'])
const emit = defineEmits(['close'])
const state = reactive({ isLoading: false, showSuccess: false })
const modalTitle = computed(() => {
    return state.showSuccess ? 'All Done!' : 'Request an Invite'
})
const form = ref<FormType>({
    name: null,
    email: null,
    reenteredEmail: null,
})
const formRef = ref<FormInst | null>(null)
const rEmailFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const rules: FormRules = {
    name: [
        {
            required: true,
        },
        {
            validator: validateNameFormat,
            message: 'At least 3 characters',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please enter your email',
        },
        {
            validator: validateEmailFormat,
            message: 'Email format is invalid',
            trigger: 'blur',
        },
    ],
    reenteredEmail: [
        {
            required: true,
            message: 'Please enter your email again',
            trigger: ['input', 'blur'],
        },
        {
            validator: validateEmailStartWith,
            message: 'Two email entries are inconsistent',
            trigger: 'input',
        },
        {
            validator: validateEmailSame,
            message: 'Two email entries are inconsistent',
            trigger: ['blur', 'email-input'],
        },
    ],
}
function validateNameFormat(rule: FormItemRule, value: string): boolean {
    return !!value && value.length >= 3
}
function validateEmailFormat(rule: FormItemRule, value: string): boolean {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(value)
}
function validateEmailStartWith(rule: FormItemRule, value: string): boolean {
    return !!form.value.email && form.value.email.startsWith(value) && form.value.email.length >= value.length
}
function validateEmailSame(rule: FormItemRule, value: string): boolean {
    return value === form.value.email
}
function handleEmailInput() {
    if (form.value.reenteredEmail) {
        rEmailFormItemRef.value?.validate({ trigger: 'email-input' })
    }
}
function onClickGetInvitationBtn() {
    formRef.value?.validate((errors) => {
        if (!errors) {
            sendInvitationRequest()
        } else {
            message.error('Validation Failed')
        }
    })
}
async function sendInvitationRequest() {
    state.isLoading = true
    try {
        const requestURL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
        await axios.post(requestURL, {
            name: form.value.name,
            email: form.value.email,
        })
        message.success('Success')
        showSuccessModal()
    } catch (error) {
        message.error((error as Error).message)
    } finally {
        state.isLoading = false
    }
}
function onCloseModal() {
    emit('close')
}
function showSuccessModal() {
    toggleShowSuccess()
    const CLOSE_TIME = 5 * 1000
    setTimeout(() => {
        onCloseModal()
    }, CLOSE_TIME)
}
function toggleShowSuccess() {
    state.showSuccess = !state.showSuccess
}
</script>

<template>
    <n-modal :show="props.showModal" @mask-click="onCloseModal" class="inivitation-modal">
        <n-card :title="modalTitle">
            <n-form v-if="!state.showSuccess" ref="formRef" :model="form" :rules="rules">
                <n-form-item path="name" label="Name">
                    <n-input v-model:value="form.name" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="email" label="Email">
                    <n-input v-model:value="form.email" type="email" @input="handleEmailInput" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item ref="rEmailFormItemRef" first path="reenteredEmail" label="Confirm Email">
                    <n-input
                        v-model:value="form.reenteredEmail"
                        :disabled="!form.email"
                        type="email"
                        @keydown.enter.prevent
                    />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button :loading="state.isLoading" round type="primary" @click="onClickGetInvitationBtn">
                                Send
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
            <div v-else class="success-content">
                You will be one of the first to experience Broccoli & Co. when we launch.
                <n-button strong secondary round @click="onCloseModal"> OK </n-button>
            </div>
        </n-card>
    </n-modal>
</template>

<style scoped lang="scss">
.inivitation-modal {
    width: 50%;
    min-width: 360px;
    .success-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100px;
    }
}
</style>
