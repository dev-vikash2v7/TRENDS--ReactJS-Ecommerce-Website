import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Tabs,
  Tab,
} from "@mui/material";
import Header from "../../components/Header/Header"; // Adjust the import path as necessary
import Footer from "../../components/Footer/Footer"; // Adjust the import path as necessary
import casualShoesImage from "../../assets/images/casual_shoes.jpg";
import brandedWatchImage from "../../assets/images/branded_watch.jpg";
import designerBagsImage from "../../assets/images/designer_bags.jpg";
import trendySkirtsImage from "../../assets/images/trendy_skirts.jpg";
import product1Image from "../../assets/images/product1.jpg";
import product2Image from "../../assets/images/product2.jpg";
import blackImage from "../../assets/images/black.jpg";
import lastImage from "../../assets/images/last.jpg";
import product5Image from "../../assets/images/product-5.jpg";
import product6Image from "../../assets/images/product-6.jpg";
import product7Image from "../../assets/images/product-7.jpg";
import product8Image from "../../assets/images/product-8.jpg";
import Slider, { CustomArrowProps } from "react-slick";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  products: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {

  const [selectedTab, setSelectedTab] = useState(0);

 
  // Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
  };

  const banners = [
    { id: 1, name: "Designer Bags", imageUrl: designerBagsImage, label: "New" },
    {
      id: 2,
      name: "Branded Watch",
      imageUrl: brandedWatchImage,
      label: "Sale",
    },
    { id: 3, name: "Casual Shoes", imageUrl: casualShoesImage, label: "Hot" },
  ];

  const banners2 = [
    { id: 1, name: "Designer Bags", imageUrl: designerBagsImage, label: "New" },
 
    { id: 3, name: "Casual Shoes", imageUrl: casualShoesImage, label: "Hot" },
  ];

  



  const specialTrendProducts = [
    { id: 1, title: "Shirt 1", imageUrl: product1Image, price: 250.0 },
    { id: 2, title: "Shirt 2", imageUrl: product2Image, price: 150.0 },
    { id: 3, title: "Shirt 3", imageUrl: product1Image, price: 75.0 },
    { id: 4, title: "Shirt 4", imageUrl: product1Image, price: 75.0 },
  ];

  const handleAddToCart = (productId: number) => {
    // console.log(`Product ${productId} added to cart.`);
    // Implement add to cart functionality
    
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const navigate = useNavigate();

  const navigateToProductDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        {/* Carousel unit */}
        <Slider {...settings}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${trendySkirtsImage})`,
              backgroundSize: "cover",
              height: 800,
            }}
          />
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${trendySkirtsImage})`,
              backgroundSize: "cover",
              height: 800,
            }}
          />
        </Slider>

        <Box sx={{ flexGrow: 1, paddingBottom: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ margin: 0, width: "100%", overflow: "hidden" }}
          >
            {" "}
            {banners.map((banner, index) => (
              <Grid
                item
                key={banner.id}
                xs={4}
                sx={{
                  padding: (theme) => theme.spacing(1),
                  "&:first-of-type": {
                    paddingLeft: (theme) => theme.spacing(0),
                  },
                  "&:last-of-type": {
                    paddingRight: (theme) => theme.spacing(0),
                  },
                }}
              >
                <Card sx={{ maxWidth: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={banner.name}
                      image={banner.imageUrl}
                      sx={{ height: 350, width: "100%" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            WE LOVE TREND
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            sx={{
              ".MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab label="Featured Products" sx={tabStyle(selectedTab === 0)} />
            <Tab label="New Products" sx={tabStyle(selectedTab === 1)} />
            <Tab label="Best Products" sx={tabStyle(selectedTab === 2)} />
          </Tabs>
        </Box>
        
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "lg",
            mx: "auto",
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            {products.map((product:any, index:number) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                onClick={() => navigateToProductDetails(product.id)}
              >
              <ProductCard
                imageUrl={product.imageUrl}
                title={product.name}
                price={product.price}
                onAddToCart={() => handleAddToCart(product.id)}
              />
              </Grid>
            ))}
          </Grid>   
          <Box sx={{ marginTop: 6, marginBottom: 6, marginRight: 7 }}>
            <Grid container spacing={4} justifyContent="center">
              {banners2.map((banner, index) => (
                <Grid
                  item
                  key={banner.id}
                  xs={12} // Full width on extra small screens
                  sm={4} // 1/3 width on small screens
                  md={4} // 1/3 width on medium screens
                  lg={6} // 1/3 width on large screens
                  sx={{
                    display: "flex",
                    justifyContent: "center", // Center the card if smaller than the grid column
                    padding: (theme) => theme.spacing(1), // Adjust padding if needed
                  }}
                >
                  <Card sx={{ width: "100%", maxWidth: "100%" }}>
                    {" "}
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={banner.name}
                        image={banner.imageUrl}
                        sx={{ height: "auto", width: "100%" }}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            SPECIAL TREND PRODUCTS
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "lg",
            mx: "auto",
            marginBottom: 10,
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            {specialTrendProducts.map((product, index) => (
              <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
                <ProductCard
                  imageUrl={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

const tabStyle = (isSelected: boolean) => ({
  textTransform: "none",
  backgroundColor: isSelected ? "black" : "transparent",
  color: isSelected ? "white" : "black",
  borderRadius: "4px",
  margin: "0 8px", // Adjust the margin between tabs
  padding: "6px 16px 4px",
  "&.Mui-selected": {
    color: "white",
  },
  "&:hover": {
    color: "white",
    backgroundColor: "black",
    opacity: 0.3,
  },
});

const arrowStyle = {
  zIndex: 2,
  display: "block",
  // background: "white",
  color: "black",
  borderRadius: "25%", // This will make it round, adjust as necessary for square with rounded corners
  padding: "10px", // Adjust the padding to control the size of the box
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", // Optional shadow for better visibility
};

const SampleNextArrow: React.FC<CustomArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        ...arrowStyle,
        right: 20,
        color: "black",
      }}
      onClick={onClick}
    >
      {">"}
    </div>
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        ...arrowStyle,
        left: 20, // Adjust the position inside the container
      }}
      onClick={onClick}
    >
      {"<"}
    </div>
  );
};

export default HomePage;
