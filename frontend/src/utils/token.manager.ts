import jwtDecode from "jwt-decode"

/**
 * ## Token
 */
export interface TokenInterface {
  idx: number,
  iat: Date,
  exp: Date,
}

const getPayload = (token: string): TokenInterface => {

  const tokenData = jwtDecode<TokenInterface>(token)

  return {
    idx: tokenData.idx,
    iat:  new Date((Number(tokenData.iat) * 1000)),
    exp: new Date((Number(tokenData.exp) * 1000)),
  }
}


const TokenManager = {
  getPayload
}

export default TokenManager