type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
   if (value) return undefined
   return 'this field is required'
}

export const maxLengthCreator = (length: number): FieldValidatorType => {
   return (value) => {
      if (value && value.length > length) return `max length is ${length} symbols`
      return undefined
   }
}