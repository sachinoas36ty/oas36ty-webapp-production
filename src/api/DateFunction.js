let date = new Date()
let current_date = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`
function time_check(time) {
    let time2 = new Date('2023-04-13 '+time)
    if(time2.getHours() < 7){
        return "less than";
    }else if(time2.getHours() >= 7){
        // if()
        return "greater than";
    }
}
function date_plus(date) {
    const old_date = new Date(date);
    const new_date = `${old_date.getFullYear()}-${(old_date.getMonth() + 1) < 10 ? '0'+(old_date.getMonth() + 1) : (old_date.getMonth() + 1)}-${(old_date.getDate() + 1) < 10 ? '0'+(old_date.getDate() + 1) : (old_date.getDate() + 1)}`
    return new_date;
}
function check_date_less_greater(latest_date, total_hour) {
    // alert(latest_date);
    // alert(total_hour);

    

        const la_date = new Date(latest_date)
        const curr_date = new Date(current_date)
        const hour = new Date('2023-04-13 '+total_hour)
        if(la_date < curr_date ){
            if(hour.getHours() < 7){
                
                return 'enable'
            }else if(hour.getHours() >= 7){
                return 'disable'
            }
        }else if(la_date === curr_date){
            return 'disable'
        }
    
}
export {
    current_date,
    time_check,
    check_date_less_greater,
    date_plus,
}
