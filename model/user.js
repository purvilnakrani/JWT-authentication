const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcrypt');

const userSchema= new mongoose.Schema({
    email:{
        type:'string',
        required:[true,"please provide email"],
        lowercase:true,
        unique:true,
        validate:[validator.isEmail,"that is not valid email"]
    },
    password:{
        type:'string',
        required:[true,"please enter password"],
        minlength:[6,"password must be greater than 6 character"]
    }
});

// fire a function(middleware) before doc saved to db
userSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

// static method to login user
userSchema.statics.login= async function(email, password){
    const user = await this.findOne({email:email});
    if(user){
        const auth= await bcrypt.compare(password,this.password);
        if(auth){
            return user;
        }else{
            throw Error("Incorrect password")
        }
    }else{
        throw Error("Incorrect email")
    }
};

const User = mongoose.model('user',userSchema);

module.exports=User;