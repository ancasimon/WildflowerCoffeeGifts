CREATE TABLE Users (
	Id int Identity(1,1) not null,
	Username nvarchar(100) not null,
	FirstName nvarchar(100) not null,
	LastName nvarchar(100) not null,
	Email nvarchar(100) not null,
	[DateCreated] DateTime not null,
	[PassWord] nvarchar(100) not null
)

ALTER TABLE dbo.Users Add CONSTRAINT 
 [PK_Users] PRIMARY KEY CLUSTERED 
 (Id)

CREATE TABLE PaymentTypes (
	Id int Identity(1,1) not null,
	PaymentType nvarchar(25) not null,
	UserId int not null,
	AccountNo bigint not null,
	ExpirationYear int not null,
	ExpirationMonth int not null,
	IsActive bit not null
)
ALTER TABLE dbo.PaymentTypes Add CONSTRAINT 
 [PK_PaymentTypes] PRIMARY KEY CLUSTERED 
 (Id)

ALTER TABLE [dbo].[PaymentTypes] Add Foreign Key(UserId) References Users(Id)

CREATE TABLE Products (
	Id int Identity(1,1) not null,
	Title nvarchar(100) not null,
	ImageUrl nvarchar(1000) null,
	ProductThemeId int not null,
	Price int not null,
	[Description] nvarchar(100) not null,
	CoffeeMugId int null,
	FlowerArrId int null	
)
ALTER TABLE dbo.Products Add CONSTRAINT 
 [PK_Products] PRIMARY KEY CLUSTERED 
 (Id)

CREATE TABLE ProductThemes (
  Id int Identity(1,1) not null,
  Theme nvarchar(25) not null
  )

  ALTER TABLE dbo.ProductThemes Add CONSTRAINT 
 [PK_ProductThemes] PRIMARY KEY CLUSTERED 
 (Id)
 ALTER TABLE [dbo].[Products] Add Foreign Key(ProductThemeId) References ProductThemes(Id)


 CREATE TABLE CoffeeMugs (
   Id int Identity(1,1) not null,
   Title nvarchar(100) not null,
   ImageUrl nvarchar(1000) null,
   ProductThemeId int not null,
   Price int not null,
   [Description] nvarchar(100) not null
  )

  ALTER TABLE dbo.CoffeeMugs Add CONSTRAINT 
 [PK_CoffeeMugs] PRIMARY KEY CLUSTERED 
 (Id)

 ALTER TABLE [dbo].[Products] Add Foreign Key(CoffeeMugId) References CoffeeMugs(Id)

 ALTER TABLE [dbo].[CoffeeMugs] Add Foreign Key(ProductThemeId) References ProductThemes(Id)



  CREATE TABLE FlowerArrangements (
   Id int Identity(1,1) not null,
   Title nvarchar(100) not null,
   ImageUrl nvarchar(1000) null,
   Price int not null,
   [Description] nvarchar(100) not null
  )
  ALTER TABLE dbo.FlowerArrangements Add CONSTRAINT 
 [PK_FlowerArrangements] PRIMARY KEY CLUSTERED 
 (Id)

  ALTER TABLE [dbo].[Products] Add Foreign Key(FlowerArrId) References FlowerArrangements(Id)

  CREATE TABLE Orders (
   Id int Identity(1,1) not null,
   UserId int not null,
   IsCompleted bit not null,
   TotalPrice int not null,
   PaymentTypeId int not null,
   PurchaseDate DateTime not null,
   DeliveryAddress nvarchar (1000)not null
   )
   ALTER TABLE dbo.Orders Add CONSTRAINT 
   [PK_Orders] PRIMARY KEY CLUSTERED 
 (Id)
 ALTER TABLE [dbo].[Orders] Add Foreign Key(UserId) References Users(Id)
 ALTER TABLE [dbo].[Orders] Add Foreign Key(PaymentTypeId) References PaymentTypes(Id)

    CREATE TABLE ProductOrders (
   Id int Identity(1,1) not null,
   ProductId int not null,
   OrderId int not null,
   Qty int not null
   )
    
   ALTER TABLE dbo.ProductOrders Add CONSTRAINT 
   [PK_ProductOrders] PRIMARY KEY CLUSTERED 
 (Id)

 ALTER TABLE [dbo].[ProductOrders] Add Foreign Key(ProductId) References Products(Id)
 ALTER TABLE [dbo].[ProductOrders] Add Foreign Key(OrderId) References Orders(Id)

 --ADD SEED DATA:

 --Add Users:
 --User 1:
 declare @username nvarchar(100) = 'annie.bellina@gmail.com'
 declare @firstName nvarchar(100) = 'Annie'
 declare @lastName nvarchar(100) = 'Bellina'
 declare @email nvarchar(100) = 'annie.bellina@gmail.com'
 declare @dateCreated datetime = '06/01/2020'
 declare @password nvarchar(100) = 'Password123'
 insert into Users(Username, FirstName, LastName, Email, DateCreated, PassWord) 
 values(@username, @firstName, @lastName, @email, @dateCreated, @password)

 --User 2:
 declare @username nvarchar(100) = 'karine.landau@gmail.com'
 declare @firstName nvarchar(100) = 'Karine'
 declare @lastName nvarchar(100) = 'Landau'
 declare @email nvarchar(100) = 'karine.landau@gmail.com'
 declare @dateCreated datetime = '07/01/2020'
 declare @password nvarchar(100) = 'Password123'
 insert into Users(Username, FirstName, LastName, Email, DateCreated, PassWord) 
 values(@username, @firstName, @lastName, @email, @dateCreated, @password)

 --User 3:
 declare @username nvarchar(100) = 'allistair.mcmill@gmail.com'
 declare @firstName nvarchar(100) = 'Allistair'
 declare @lastName nvarchar(100) = 'McMill'
 declare @email nvarchar(100) = 'allistair.mcmill@gmail.com'
 declare @dateCreated datetime = '08/01/2020'
 declare @password nvarchar(100) = 'Password123'
 insert into Users(Username, FirstName, LastName, Email, DateCreated, PassWord) 
 values(@username, @firstName, @lastName, @email, @dateCreated, @password)

 select *
 from Users


 --Ad Payment Types:
 --PaymentTypes for user 1:
declare @paymentType nvarchar(25) = 'Visa'
declare @userId int = 1
declare @accountNo bigint = 1111111111111111
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'Mastercard'
declare @userId int = 1
declare @accountNo bigint = 1234567899990000
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'American Express'
declare @userId int = 1
declare @accountNo bigint = 0000000000000001
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 0
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

 --PaymentTypes for user 2:
declare @paymentType nvarchar(25) = 'Visa'
declare @userId int = 2
declare @accountNo bigint = 2222222222222222
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'Mastercard'
declare @userId int = 2
declare @accountNo bigint = 1234123412341234
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'American Express'
declare @userId int = 2
declare @accountNo bigint = 0000111100002222
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 0
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

 --PaymentTypes for user 3:
declare @paymentType nvarchar(25) = 'Visa'
declare @userId int = 3
declare @accountNo bigint = 3333333333333333
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'Mastercard'
declare @userId int = 3
declare @accountNo bigint = 1234432112344321
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

declare @paymentType nvarchar(25) = 'American Express'
declare @userId int = 3
declare @accountNo bigint = 3333000033330000
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 0
insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)

select *
from PaymentTypes


--Add Product Themes:
declare @theme nvarchar(25) = 'Sports'
insert into ProductThemes(Theme)
values(@theme)

declare @theme nvarchar(25) = 'Travel'
insert into ProductThemes(Theme)
values(@theme)

declare @theme nvarchar(25) = 'Dog Lover'
insert into ProductThemes(Theme)
values(@theme)

select *
from ProductThemes

--Add Coffee Mugs:
insert into CoffeeMugs(Title, ImageUrl, ProductThemeId, Price, Description)
values('Sports Mug', 'www.google.com', 1, 10.99, 'description of sports mug')

insert into CoffeeMugs(Title, ImageUrl, ProductThemeId, Price, Description)
values('Travel Mug', 'www.google.com', 2, 10.99, 'description of travel mug')

insert into CoffeeMugs(Title, ImageUrl, ProductThemeId, Price, Description)
values('Dog Lover Mug', 'www.google.com', 3, 10.99, 'description of dog lover mug')

select *
from CoffeeMugs

--Add Flower Arrangements:
insert into FlowerArrangements(Title, ImageUrl, Price, Description)
values('Daisies', 'www.google.com', 19.99, 'description of bouquet')

insert into FlowerArrangements(Title, ImageUrl, Price, Description)
values('Roses', 'www.google.com', 19.99, 'description of bouquet')

insert into FlowerArrangements(Title, ImageUrl, Price, Description)
values('Chrysanthumums', 'www.google.com', 19.99, 'description of bouquet')

select *
from FlowerArrangements

 --Add Products:
 --Product 1:
declare @title nvarchar(100) = 'Sports-Fan Daisy Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 1
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 1
declare @flowerArrId int = 1
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--Product 2:
declare @title nvarchar(100) = 'Sports-Fan Rose Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 1
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 1
declare @flowerArrId int = 2
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--Product 3:
declare @title nvarchar(100) = 'Travel-Fan Daisy Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 2
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 2
declare @flowerArrId int = 1
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--Product 4:
declare @title nvarchar(100) = 'Travel-Fan Rose Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 2
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 2
declare @flowerArrId int = 2
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--Product 5:
declare @title nvarchar(100) = 'Dog Lover Daisy Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 3
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 3
declare @flowerArrId int = 1
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--Product 6:
declare @title nvarchar(100) = 'Dog Lover Rose Arrangement'
declare @imageUrl nvarchar(100) = 'www.google.com'
declare @productThemeId int = 3
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 3
declare @flowerArrId int = 2
insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

select *
from Products

--Add Orders:
insert into Orders(UserId, IsCompleted, TotalPrice, PaymentTypeId, PurchaseDate, DeliveryAddress)
values(1, 1, 30.99, 1, '10/01/2020', '123 Linden Ave, Nashville, TN')

insert into Orders(UserId, IsCompleted, TotalPrice, PaymentTypeId, PurchaseDate, DeliveryAddress)
values(2, 1, 20.99, 2, '10/10/2020', '111 Broadway Ave, Nashville, TN')

insert into Orders(UserId, IsCompleted, TotalPrice, PaymentTypeId, PurchaseDate, DeliveryAddress)
values(3, 1, 50.99, 3, '10/20/2020', 'Nashville Software School, Nashville, TN')

select *
from Orders

--Add Product Orders:
insert into ProductOrders(ProductId,OrderId, Qty)
values(1, 1, 2)

insert into ProductOrders(ProductId,OrderId, Qty)
values(1, 1, 1)

insert into ProductOrders(ProductId,OrderId, Qty)
values(2, 2, 3)

insert into ProductOrders(ProductId,OrderId, Qty)
values(3, 3, 5)

select *
from ProductOrders








