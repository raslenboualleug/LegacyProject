
module.exports=(connection,DataTypes)=>{

    const Product = connection.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock:{
       type: DataTypes.FLOAT,
      allowNull:false
      },
      picture: {
        type: DataTypes.STRING, 
        allowNull: false, 
      },
      rating:{
        type:DataTypes.FLOAT,
        allowNull:true
      },
      numOfRating:{
        type:DataTypes.INTEGER, 
        allowNull:true
      },

      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    });
    
   return Product
  
  }
  
  
  