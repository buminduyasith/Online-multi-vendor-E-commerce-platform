
1. [*] use role base protected routing. when seller sign in to his account, he shouldn't be able access 
      to customer dashboard
      
2. [] get customer and seller details base on wich user wich role then setcurrentuser with that data aswell;

3. [] search some wordpress site and look their dashboard and select what tabs should display

4. [] when user click add cart button show a popup msg product added or something

5. [*] when user logout cart and product basket also should remove 

6. [*] create a order number for user from front side. then send it to backend as well
      then user can track his product 

7. [*] when user not loggin to his account. he still can see products tab . and he can also see 
      add to cart button . if user not log and he press add to cart button display alert
      please log to your account . implement that code on 'add to cart' button handler

8. [] store useraccount details on localstorage so user no need to log again when tab is close      

9. [] shipping service   @GetMapping(value = "/orders/{id}") change parameter that 2 --->> id

10. [] category id not working both add and update form

11. [*] product delete button on product list crearte new coulmn call action and show that button
      and also have to make rest route for that



12. [*] validate two sign up pages and validate login page as well 
       add alert when succes and erros . 


13. [] user dashboard should have 
            i   [ * ] show orders (ordernumber,product number , qty,sku,shipped address,sellerdetails   
                   (shop name and his name))
            ii  [ *] can delete orders
            iii [ ] show profile and 
            iv  [*] show log out button

14. [] seller dashboard
            i.   [ ] show profile
            ii.  [ * ] show log out button      
            iii. [ * ] add seller dashboard summerized for main menu


15. [*] that navigation icon should work only if seller or customer log to their accounts


16. [] change the jumbotron text


17. [] change icon of the drawer
            [*] seller dashboard
            [*] customer dashboard

18. [] password toggel for two signup pages and login


19. [] phone number and email should be unique


20. [*] shipping address not show seller orders
      shipping addres is now on cart model but it should move to the cart item model


21. [*] should  validate shipping form

22. [*] when customer delete a order it should display that raw colour red
      and show status user deleted. add 'delete' to status array in dashboard