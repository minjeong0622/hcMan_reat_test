// src/pages/Item/ItemSearchPage.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { ItemContainer } from "../../components/Item/ItemContainer";

const ItemSearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>품목 관리</Typography>
      <ItemContainer />
    </Container>
  );
};

export default ItemSearchPage;
