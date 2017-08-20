export const STATE_ISLOGIN = (state, isLogin) => {
  state.isLogin = isLogin
}

export const STATE_LOGINLOADING = (state, loginLoading) => {
  state.loginLoading = loginLoading
}

export const STATE_LOCATION = (state, location) => {
  state.location = location
}

export const STATE_DIALOGSWITCH = (state, dialogSwitch) => {
  state.dialog.switch = dialogSwitch
}

export const STATE_CURINDEX = (state, curIndex) => {
  state.curIndex = curIndex
}

export const STATE_TITLE = (state, title) => {
  state.title = title
}

export const STATE_PATHNAME = (state, pathName) => {
  state.pathName = pathName
}

export const STATE_TRACKLIST = (state, trackList) => {
  state.trackList = trackList
}

export const STATE_TRACKCHOOSE = (state, trackChoose) => {
  state.trackChoose = trackChoose
}

export const STATE_CHECKINFO = (state, checkInfo) => {
  state.checkInfo = checkInfo
}

export const STATE_VERIFYCODE = (state, verifyCode) => {
  state.verifyCode = verifyCode
}
