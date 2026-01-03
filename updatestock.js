
import mongoose from 'mongoose';
import {dbConfig} from './config/db.config.js'
import {Product} from './model/product.model.js'


mongoose.connect(dbConfig.url).then(()=>{

    console.log("Database connected!");

}).catch((error)=>{
console.log("Error is :",error);
});


export default updateStock = async function(productId,quantity = 0){

        // find the product
        const product  = await Product.find({productId:productId}); // [......]
        const updatedStockQuantity = product[0]?.quantityInStock - quantity;

        const productPacket =  {

            productName:product[0]?.productName,
            productLine:product[0]?.productLine,
            productScale:product[0]?.productScale,
            productVendor:product[0]?.productVendor,
            productDescription:product[0]?.productDescription,
            quantityInStock:updatedStockQuantity, // update stock quantity
            buyPrice:product[0]?.buyPrice,
            MSRP:product[0]?.MSRP,
            image:product[0]?.image,
            productID:product[0]?.productID

        }

        if(product.length > 0){

            // DB_OPS x

            await Product.updateOne(
                {productID:productId}, // if productId matches (Filters)
                {$set:productPacket}, // Updated Packet
                {upsert:true} // if not matches found , insert new one (Options)
            ).then(()=>{
                console.log("Stock Updated Successfully !");
            }).catch((err)=>{

                console.log("error happen due to :",err);
            });

        }


}

module.exports = updateStock;