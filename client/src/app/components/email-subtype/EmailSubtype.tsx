import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

export const EmailSubtype = ({ handleChange, emailType }: any) => {
    if (emailType === 'flow_email') {
        return (
            <Select
                className='transition-max-h duration-300'
                name='email_subtype'
                onChange={handleChange}
                items={[
                    {
                        label: 'Welcome Series Flow',
                        value: 'wecome',
                        description: '',
                    },
                    {
                        label: 'Post Purchase Flow',
                        value: 'post_purchase',
                        description: '',
                    }
                ]}
                isRequired={true}
                label={'Email Subtype'}
                placeholder={'Select an option'}
            >
                {(input: any) => <SelectItem key={input.value}>{input.label}</SelectItem>}
            </Select>
        )
    }
    else if (emailType === 'email_campaign') {
        return (
            <Select
                name='email_subtype'
                onChange={handleChange}
                items={[
                    {
                        label: 'Discount',
                        value: 'discount',
                        description: '',
                    },
                    {
                        label: 'Value Email',
                        value: 'value_email',
                        description: '',
                    }
                ]}
                isRequired={true}
                label={'Email Type'}
                placeholder={'Select an option'}
            >
                {(input) => <SelectItem key={input.value}>{input.label}</SelectItem>}
            </Select>
        )
    }
}
