module.exports = (req) => {
    let err = null
    if(!req.params)
        return 'Please choose coins and date'
    if(!req.params.coins)
        err += 'Please choose coins \n'
    if(!req.params.date)
        err += 'Please choose date'

    return err || next()
}