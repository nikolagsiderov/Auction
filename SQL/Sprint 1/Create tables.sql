CREATE TABLE [User] (
    [ID] INTEGER,
	[FirstName] NVARCHAR(255),
	[LastName] NVARCHAR(255),
	[Email] NVARCHAR(255),
    [PasswordHash] VARBINARY(1024),
	[PasswordSalt] VARBINARY(1024),
	CONSTRAINT PK_User PRIMARY KEY (ID)
);

CREATE TABLE [Category] (
    [ID] INTEGER,
	[CreatedByID] INTEGER NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
    [Title] NVARCHAR(255) NOT NULL,
	[Description] TEXT NULL,
	CONSTRAINT PK_Category PRIMARY KEY (ID),
	CONSTRAINT FK_UserCreatedCategory FOREIGN KEY ([CreatedByID])
    REFERENCES [User]([ID])
);

CREATE TABLE [Order] (
    [ID] INTEGER,
	[BuyerUserID] INTEGER NOT NULL,
	[SellerUserID] INTEGER NOT NULL,
	[CreatedByID] INTEGER NOT NULL,
	[Status] INTEGER NOT NULL,
	[Price] DECIMAL(10, 2) NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	CONSTRAINT PK_Order PRIMARY KEY (ID),
	CONSTRAINT FK_BuyerUserOrder FOREIGN KEY ([BuyerUserID])
    REFERENCES [User]([ID]),
	CONSTRAINT FK_SellerUserOrder FOREIGN KEY ([SellerUserID])
    REFERENCES [User]([ID]),
	CONSTRAINT FK_UserCreatedOrder FOREIGN KEY ([CreatedByID])
    REFERENCES [User]([ID])
);

CREATE TABLE [Item] (
    [ID] INTEGER,
	[CreatedByID] INTEGER NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
    [Title] NVARCHAR(255) NOT NULL,
	[Description] TEXT NULL,
    [StartingPrice] DECIMAL(10, 2) NOT NULL,
    [BuyNowPrice] DECIMAL(10, 2) NULL,
    [ReservedPrice] DECIMAL(10, 2) NULL,
    [LastBidAmount] DECIMAL(10, 2) NULL,
    [LastBidByID] INTEGER NULL,
	[LastBidDate] DATETIME NULL,
    [EndDate] DATETIME NOT NULL,
    [SnipingProtection] BIT DEFAULT(0),
	[OrderID] INTEGER NULL,
	[CategoryID] INTEGER NOT NULL,
	CONSTRAINT PK_Item PRIMARY KEY (ID),
	CONSTRAINT FK_UserCreatedItem FOREIGN KEY ([CreatedByID])
    REFERENCES [User]([ID]),
	CONSTRAINT FK_UserLastBidItem FOREIGN KEY ([LastBidByID])
    REFERENCES [User]([ID]),
	CONSTRAINT FK_OrderItem FOREIGN KEY ([OrderID])
    REFERENCES [Order]([ID]),
	CONSTRAINT FK_CategoryItem FOREIGN KEY ([CategoryID])
    REFERENCES [Category]([ID])
);

CREATE TABLE [ItemHistory] (
    [ID] INTEGER,
	[ItemID] INTEGER NOT NULL,
	[UserID] INTEGER NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
    [BidAmount] DECIMAL(10, 2) NOT NULL,
	CONSTRAINT PK_ItemHistory PRIMARY KEY (ID),
	CONSTRAINT FK_UserBidItemHistory FOREIGN KEY ([UserID])
    REFERENCES [User]([ID]),
	CONSTRAINT FK_ItemItemHistory FOREIGN KEY ([ItemID])
    REFERENCES [Item]([ID])
);

CREATE TABLE [Image] (
    [ID] INTEGER,
	[Name] NVARCHAR(255) NULL,
	[HostID] INTEGER NOT NULL,
	[CreatedByID] INTEGER NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	CONSTRAINT PK_Image PRIMARY KEY (ID),
	CONSTRAINT FK_HostItemImage FOREIGN KEY ([HostID])
    REFERENCES [Item]([ID]),
	CONSTRAINT FK_UserCreatedImage FOREIGN KEY ([CreatedByID])
    REFERENCES [User]([ID])
);

INSERT INTO [User] ([ID], [Email], [FirstName], [LastName])
VALUES (0, 'system_generated@beeds.bg', 'Beeds', 'Inc.');

INSERT INTO [Category] ([ID], [Title], [CreatedByID], [CreatedDate])
VALUES (0, 'Обща', 0, DATE());