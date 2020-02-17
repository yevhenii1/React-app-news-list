export  const formatDate = (date) => {
    let dateTime = new Date(date)
    return (dateTime.getDate() <= 9 ? '0' + dateTime.getDate() : dateTime.getDate()) + '/' +
        dateTime.getMonth() + '/' +
        dateTime.getFullYear() + ', ' +
        (dateTime.getHours() <=9 ? '0' + dateTime.getHours() : dateTime.getHours() ) + ':' +
        (dateTime.getMinutes() <=9 ? '0' + dateTime.getMinutes() : dateTime.getMinutes() )

}