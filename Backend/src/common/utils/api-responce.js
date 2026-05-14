class ApiResponce {
    static ok(message,data= null){
       return res.status(200).json({message,data})
    }

    static created(message,data= null){
        return res.status(201).json({message,data})
     }
}

export default ApiResponce