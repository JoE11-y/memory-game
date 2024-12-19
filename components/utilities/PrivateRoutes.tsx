import { useAccessToken } from '@/hooks/useAccessToken'
import { useGetProfileQuery } from '@/redux-services/auth.service'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAccessToken()
  const router = useRouter()
  const { isError, error } = useGetProfileQuery({ accessToken })
  // useEffect(() => {
  //   if (isError) {
  //     setAccessToken("")
  //     console.log(error)
  //     router.replace("/login")
  //   }
  //   if (!accessToken) {
  //     router.replace("/login")
  //   }
  // }, [accessToken, router, isError])
  return <div>{children}</div>
}

export default PrivateRoutes
