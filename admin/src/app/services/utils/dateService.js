export function formatDateString(s)
{
    var d = new Date(s)
    return d.getDate() + ' / ' + 
    (d.getMonth() + 1) + " / " + 
    d.getFullYear() + "  ,  " + 
    d.getHours() + " : " +
    d.getMinutes() + " : " + 
    d.getSeconds()
}
export function convertDateforPicker(s)
{
    var d = new Date(!s?s = Date.now():s)
    return d.toISOString().slice(0,10)
}
export function valideDate(s,t)
{
    var ds = new Date(s)
    var dt = new Date(t)
    return ds <= dt
}