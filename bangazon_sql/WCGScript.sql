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
	AccountNo int not null,
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

 --ADD DATA:

 --Add Users:
 declare @username nvarchar(100) = 'annie.bellina@gmail.com'
 declare @firstName nvarchar(100) = 'Annie'
 declare @lastName nvarchar(100) = 'Bellina'
 declare @email nvarchar(100) = 'annie.bellina@gmail.com'
 declare @dateCreated datetime = '06/01/2020'
 declare @password nvarchar(100) = 'Password123'

 insert into Users(Username, FirstName, LastName, Email, DateCreated, PassWord) 
 values(@username, @firstName, @lastName, @email, @dateCreated, @password)

 declare @username nvarchar(100) = 'karine.landau@gmail.com'
 declare @firstName nvarchar(100) = 'Karine'
 declare @lastName nvarchar(100) = 'Landau'
 declare @email nvarchar(100) = 'karine.landau@gmail.com'
 declare @dateCreated datetime = '07/01/2020'
 declare @password nvarchar(100) = 'Password123'

 insert into Users(Username, FirstName, LastName, Email, DateCreated, PassWord) 
 values(@username, @firstName, @lastName, @email, @dateCreated, @password)

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

 --ADD Payment Types
declare @paymentType nvarchar(25)
declare @userId int = 1
declare @accountNo int = 111111111111
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1

insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)


declare @paymentType nvarchar(25)
declare @userId int = 2
declare @accountNo int = 222222222222
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1

insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)


declare @paymentType nvarchar(25)
declare @userId int = 3
declare @accountNo int = 333333333333
declare @expirationYear int = 2025
declare @expirationMonth int = 12
declare @isActive bit = 1

insert into PaymentTypes(PaymentType, UserId, AccountNo, ExpirationYear, ExpirationMonth, IsActive)
values(@paymentType, @userId, @accountNo, @expirationYear, @expirationMonth, @isActive)


 --ADD PRODUCTS
declare @title nvarchar(100) = 'Sports-Fan Daisy Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 1
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 1
declare @flowerArrId int = 1

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

declare @title nvarchar(100) = 'Sports-Fan Rose Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 1
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 1
declare @flowerArrId int = 2

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

declare @title nvarchar(100) = 'Travel-Fan Daisy Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 2
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 2
declare @flowerArrId int = 1

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

declare @title nvarchar(100) = 'Travel-Fan Rose Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 2
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 2
declare @flowerArrId int = 2

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

declare @title nvarchar(100) = 'Dog Lover Daisy Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 3
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 3
declare @flowerArrId int = 1

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

declare @title nvarchar(100) = 'Dog Lover Rose Arrangement'
declare @imageUrl nvarchar(100) = "www.google.com"
declare @productThemeId int = 3
declare @price int = 25.99
declare @description nvarchar(100) = 'Lorem ipsum'
declare @coffeeMugId int = 3
declare @flowerArrId int = 2

insert into Products(Title, ImageUrl, ProductThemeId, Price, Description, CoffeeMugId, FlowerArrId)
values(@title, @imageUrl, @productThemeId, @price, @description, @coffeeMugId, @flowerArrId)

--ADD product themes:
declare @theme nvarchar(25) = 'Sports'

insert into ProductThemes(Theme)
values(@theme)

declare @theme nvarchar(25) = 'Travel'

insert into ProductThemes(Theme)
values(@theme)

declare @theme nvarchar(25) = 'Dog Lover'

insert into ProductThemes(Theme)
values(@theme)

--ADD COFFEE MUGS:
insert into CoffeeMugs(Title, ImageUrl, ProductThemeId, Price, Description)
values('Sports Mug', 'www.google.com', 1, 10.99, 'description of sports mug')
values('Travel Mug', 'www.google.com', 2, 10.99, 'description of travel mug')
values('Dog Lover Mug', 'www.google.com', 3, 10.99, 'description of dog lover mug')

--ADD Flower Arrangements:
insert into FlowerArrangements(Title, ImageUrl, ProductThemeId, Price, Description)
values('Daisies', 'www.google.com', 19.99, 'description of bouquet')
values('Roses', 'www.google.com', 19.99, 'description of bouquet')
values('Chrysanthumums', 'www.google.com', 19.99, 'description of bouquet')

--Add Orders:
insert into Orders(UserId, IsCompleted, TotalPrice, PaymentTypeId, PurchaseDate, DeliveryAddress)
values(1, 1, 30.99, 1, '10/01/2020', '123 Linden Ave, Nashville, TN')
values(2, 1, 20.99, 2, '10/10/2020', '111 Broadway Ave, Nashville, TN')
values(3, 1, 50.99, 3, '10/20/2020', 'Nashville Software School, Nashville, TN')

--Add Product Orders:
   ProductId int not null,
   OrderId int not null,
   Qty int not null
insert into ProductOrders(ProductId,OrderId, Qty)
values(1, 1, 2)
values(2, 1, 1)
values(2, 2, 3)








