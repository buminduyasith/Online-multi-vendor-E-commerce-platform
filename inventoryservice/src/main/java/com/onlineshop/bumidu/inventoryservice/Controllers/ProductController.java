package com.onlineshop.bumidu.inventoryservice.Controllers;

import com.onlineshop.bumidu.inventoryservice.Models.Category;
import com.onlineshop.bumidu.inventoryservice.Models.Product;
import com.onlineshop.bumidu.inventoryservice.Services.CategoryService;
import com.onlineshop.bumidu.inventoryservice.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://573b96bf2336.ngrok.io")

@RequestMapping(value = "/api/v1")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryService categoryService;

    @GetMapping(value = "/ping")
    public String test(){
        return "pong";
    }

    @GetMapping(value = "/products")
   public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @PostMapping(value = "/products")
    public ResponseEntity<Object> addNewProduct(@RequestBody Product product){

         try{
             Product saveProduct = productService.addNewProduct(product);
             return ResponseEntity.ok().body(saveProduct);

         }catch (Exception ex){

             return  ResponseEntity
                     .status(HttpStatus.BAD_REQUEST)
                     .body("Error Message");


         }
    }

    @GetMapping(value = "/products/{sku}")
    public ResponseEntity<Product> productBySku(@PathVariable String sku){

        Product product = productService.getProductBySKU(sku);

        if(product!=null){
            return ResponseEntity.ok().body(product);
        }
        else{
            return ResponseEntity.notFound().build();
        }

    }





    @GetMapping(value = "/products/details")
    public ResponseEntity<Product> productById(@RequestParam(value = "seller-id") int id,@RequestParam(value = "sku") String sku){

        Product product =  productService.getProductBySkuforSeller(id,sku);
        if(product!=null){
            return ResponseEntity.ok().body(product);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping(value = "category/{id}")
    public Optional<Category>  ProductsbyCategory(@PathVariable int id){

        return categoryService.getallProdcutsForCategroyById(id);
    }

    @GetMapping(value = "/products/seller-id/{id}")
    public List<Product> getProductBySeller(@PathVariable int id){

        return productService.getProductBySellerId(id);

    }


    @DeleteMapping(value = "/products/{id}")
    public boolean deleteProductByID(@PathVariable int id){

         productService.deleteProductById(id);

         return true;

//        if(product!=null){
//            return ResponseEntity.ok().body(product);
//        }
//        else{
//            return ResponseEntity.notFound().build();
//        }

    }


    //--testing
    @PostMapping(value = "/test")
    public ResponseEntity<Object> addNewProduct(@RequestBody Object object){

        try{

            return ResponseEntity.ok().body(object);

        }catch (Exception ex){

            return  ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error Message");


        }
    }




}
