import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import AuthForm from '@/components/AuthForm'
function SignupPage() {
  return (
    <div className="mt-20 flex flex-l flex-col item-center">
        <Card className='w-full max-w-ad'> 
            <CardHeader className='mb-4'>
                <CardTitle className='text-center text-3xl'>
                    Sign Up
                </CardTitle>

            </CardHeader>
            <AuthForm type = "signup">

            </AuthForm>
        </Card>
    </div>
  )
}

export default SignupPage