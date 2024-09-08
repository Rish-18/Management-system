const mongoose=require('mongoose')
const db=mongoose.connect('mongodb+srv://root:root@cluster0.bdxulcq.mongodb.net/stocks?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Mongo Database connected');
}).catch((err)=>{
    console.log(err);
})
module.exports=db