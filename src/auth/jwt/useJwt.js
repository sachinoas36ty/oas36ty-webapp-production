import useMyJwt from '@/auth/jwt/useMyJwt'
import axios from '@axios'

const { jwt } = useMyJwt(axios, {})
export default jwt
