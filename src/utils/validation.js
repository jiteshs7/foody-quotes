export const handleError = (name,value,length) => {
    if(value.trim('')===''){
        return {
            isValid: false,
            error: `Please enter your ${name}`
        }
    }else if(value.trim('').length<length){
        return {
            isValid: false,
            error: `${name} must be of atleast ${length} characters.`
        }
    }else{
        return {
            isValid: true,
            error:''
        }
    }
}