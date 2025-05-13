const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/
export const is_typed_arr = (t: string) => typed_arr_re.test(t)