import Swal from 'sweetalert2'

export enum NavBarSelectedPage {
  Dashboard,
  Login,
  Register,
}

export function checkAndDealError(error: { status: number }): boolean {
  if (error.status >= 200 && error.status < 300) return false
  if (error.status === 429) {
    Swal.fire({ titleText: '错误', text: '请求频率过高，请稍后再试', icon: 'error' })
    return true
  }
  Swal.fire({
    titleText: '错误',
    text: `错误码 ${error.status}`,
    icon: 'error',
  })
  return true
}
