module.exports = class FeatureAPI {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name:
                {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            }
            : {}
            this.query = this.query.find({...keyword})
        
        return this
    }
    
    filter(){
        const queryCopy = {...this.queryStr}
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        let querystring = JSON.stringify(queryCopy)
        querystring = querystring.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
        this.query = this.query.find(JSON.parse(querystring))

        return this
    }
    
    pagetoshow(resultperpage){
        const page = this.queryStr.page || 1
        const skip = resultperpage * (Number(page) -1)
        this.query = this.query.limit(resultperpage).skip(skip)
        return this

    }

}