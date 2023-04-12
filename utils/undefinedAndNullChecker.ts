

export const undefinedAndNullChecker = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    let e = data[i]
    if (e === undefined && e === null) {
      return false
    } else {
      return data
    }
  }
}
