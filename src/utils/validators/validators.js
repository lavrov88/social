export const required = value => {
   if (value) return undefined;
   return 'this field is required'
}

export const maxLengthCreator = (length) => {
   return (value) => {
      if (value && value.length > length) return `max length is ${length} symbols`
      return undefined
   }
}