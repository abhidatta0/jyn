export default async function macAddressGenerator(){
    return "XX:XX:XX:XX:XX:XX".replace(/X/g, function(){
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random()*16))
    })
}