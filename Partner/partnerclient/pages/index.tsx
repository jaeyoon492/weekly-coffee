import type { NextPage } from "next";
import DashboardContent from "../components/material/Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./product/product.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import Image from "next/image";
import {
  checkSubscribe,
  receiveSubscribeEvent,
  SubscribeMessage,
} from "../provider/modules/subscribe";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import DateByProfit from "../components/charts/DateByProfit";
import axios from "axios";
import {
  ProductCachePageResponse,
  ProductItem,
  ProductPage,
} from "../provider/modules/product";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscribeMessage = useSelector(
    (state: RootState) => state.subscribe.message
  );
  const router = useRouter();
  const partner = useSelector((state: RootState) => state.partner.data);
  const product = useSelector((state: RootState) => state.product);

  const [data, setData] = useState<
    {
      orderDate: string;
      totalPayment: number;
    }[]
  >();

  const [productCache, setProductCache] = useState<ProductItem[]>();

  useEffect(() => {
    if (partner.partnerId > 0) {
      let clientId = sessionStorage.getItem("event-clientId-id");
      if (!clientId) {
        clientId = partner.partnerId.toString();
        sessionStorage.setItem("event-clientId-id", clientId);
      }
      const eventUrl = `${process.env.NEXT_PUBLIC_API_BASE}/event/${clientId}`;
      const eventSource = new EventSource(eventUrl);

      eventSource.onmessage = (event) => {
        console.log(event.data);
        console.log(new Date().getTime() + ": " + event.data);
        if (event.data !== "connect") {
          const data: SubscribeMessage = JSON.parse(event.data);
          // console.log(data);
          dispatch(receiveSubscribeEvent(data));
        }
      };
    }
  }, []);

  const handleCheck = (subscribeId: number) => {
    dispatch(checkSubscribe(subscribeId));
  };

  const getData = async (partnerId: number, date: string) => {
    if (partnerId > 0) {
      const result = await axios.get<typeof data>(
        `${process.env.NEXT_PUBLIC_API_BASE}/profits/${partnerId}/${date}`
      );
      setData(result.data);
      return;
    }
  };

  const getProductCheche = async (companyName: string) => {
    if (partner.companyName !== "" && product.isChcheFetch === false) {
      const result = await axios.get<ProductCachePageResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE}/products/${companyName}?page=0&size=8`
      );

      const productpage: ProductPage = {
        data: result.data.content.map(
          (item) =>
            ({
              productId: item.productId,
              partnerId: item.partnerId,
              productName: item.productName,
              productPrice: item.productPrice,
              productImageUrl: item.productImageUrl,
              productInfo: item.productInfo,
              fileName: item.fileName,
              fileType: item.fileType,
              foodType: item.foodType,
              expirationData: item.expirationData,
              manufacturer: item.manufacturer,
              manufacturingDate: item.manufacturingDate,
              companyName: item.companyName,
              companyIntroduce: item.companyIntroduce,
              companyAddress: item.companyAddress,
              companyContact: item.companyContact,
              beanType: item.beanType,
              beanTag: item.beanTag,
              processing: item.processing,
              country: item.country,
              region: item.region,
              farm: item.farm,
              cupNote: item.cupNote,
              roastingPoint: item.roastingPoint,
              variety: item.variety,
              productUploadDate: item.productUploadDate,
              salesStatus: item.salesStatus,
              isEdit: false,
            } as ProductItem)
        ),
        totalElements: result.data.totalElements,
        isLast: result.data.isLast,
        totalPages: 0,
        page: 0,
        pageSize: 0,
      };

      setProductCache(productpage.data);
    }
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = year + "-" + month;
    getData(partner.partnerId, date);
    getProductCheche(partner.companyName);
  }, [partner.partnerId]);

  return (
    <>
      <DashboardContent>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={8}>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                차트
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 280,
                }}
              >
                {data && <DateByProfit data={data} />}
              </Paper>
            </Grid>
            {/* order */}
            <Grid item xs={12} md={4} lg={4}>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                주문알리미
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 280,
                  overflow: "auto",
                }}
              >
                {subscribeMessage &&
                  subscribeMessage.map(
                    (item, index) =>
                      !item.orderCheck && (
                        <Alert
                          style={{ borderRadius: "15px" }}
                          key={`alert-${index}`}
                          // variant={item.variant}
                          onClose={() => {
                            handleCheck(item.subscribeId);
                          }}
                          dismissible
                        >
                          <div className="ms-2 mb-1 fs-3">주문이요!</div>
                          <div className="float-end fs-5">
                            {item.subscribeDate.substring(0, 10)}
                          </div>
                          <button
                            className={`${styles.button} btn btn-primary ms-2 mt-0`}
                            onClick={() => {
                              router.push("/subscribe");
                              handleCheck(item.subscribeId);
                            }}
                          >
                            주문목록
                          </button>
                        </Alert>
                      )
                  )}
              </Paper>
            </Grid>
            {/* Products */}
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                최근등록 제품
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                  overflow: "auto",
                }}
              >
                <div className="d-flex flex-wrap">
                  {productCache &&
                    productCache.map((item, index) => (
                      <div
                        key={`photo-item-${index}`}
                        className="card"
                        style={{
                          width: "calc((100% - 3rem) / 4)",
                          marginLeft: index % 4 === 0 ? "0" : "1rem",
                          marginTop: index > 3 ? "1rem" : "0",
                        }}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            router.push(`/product/detail/${item.productId}`);
                          }}
                        >
                          <Image
                            src={item.productImageUrl}
                            className="card-img-top"
                            alt={item.productName}
                            layout="responsive"
                            objectFit="cover"
                            width={220}
                            height={150}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.productName}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </DashboardContent>
    </>
  );
};

export default Home;