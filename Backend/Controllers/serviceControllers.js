import expressAsyncHandler from 'express-async-handler'
import slugify from '../utils/slugify.js'
import Services from '../models/servicesModel.js'


//@desc Create a new standard service
//@route /api/services/create
//@access Admin
const createService = expressAsyncHandler(async(req,res) => {
    const service = await Services.create({
        name: req.body.name,
        description: req.body.description,
        slug: slugify(req.body.description)
    })
    if(service) {
        res.json({
            slug: service.slug,
            name: service.name,
            description: service.description
        })
    }else{
        res.json(401)
        throw new Error("Invalid Data")
    }

})

//@desc Delete a service
//@route /api/services
//@access Admin
const deleteService = expressAsyncHandler( async(req,res) => {
    const service = await Services.findOne({slug:req.params.slug})
    if(service) {
        await Services.deleteOne({slug: req.params.slug})
        res.json({ message: "Service removed" })
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})

//@desc get all services
//@route /api/services/getAll
//@access Admin
const getServices = expressAsyncHandler( async(req,res) => {
    const query = {}
    if(Array.isArray(req.query.includedNames)){
        query.name = {$in:req.query.includedNames}
    }else if(req.query.includedNames) {
        query.name = {$in:[req.query.includedNames]}
    }
    const roles = await Services.find(query)

    res.json(roles)
})

export {createService,deleteService,getServices}