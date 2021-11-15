import { put, select, takeLatest } from "@redux-saga/core/effects";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  initialNextSubscribe,
  initialNextSubscribePage,
  Subscribe,
  SubScribePage,
  SubscribePageResponse,
} from "../../provider/modules/subscribe";
import subscribeReducer from "../../provider/modules/subscribe";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { AxiosResponse } from "axios";
import { call } from "redux-saga/effects";
import subScribeApi from "../../api/subscribe";
import { addAlert } from "../../provider/modules/alert";
import { RootState } from "../../provider";

export interface SubscribePageRequest {
  partnerId: number;
  page: number;
  size: number;
}

export const requestFetchSubscribe = createAction<SubscribePageRequest>(
  `${subscribeReducer.name}/requestFetchSubscribe`
);

export const requestFetchNextSubscribe = createAction<SubscribePageRequest>(
  `${subscribeReducer.name}/requestFetchNextSubscribe`
);

function* fetchNextData(action: PayloadAction<SubscribePageRequest>) {
  yield console.log("--fetchNextData--");

  const partnerId = action.payload.partnerId;
  const page = action.payload.page;
  const size = action.payload.size;

  const subscribeArray: Subscribe[] = yield select(
    (state: RootState) => state.subscribe.data
  );

  localStorage.setItem("subscribe_page_size", size.toString());

  yield put(startProgress());

  try {
    const result: AxiosResponse<SubscribePageResponse> = yield call(
      subScribeApi.fetch,
      partnerId,
      page,
      size
    );

    console.log(result.data);

    yield put(endProgress());

    const subscribePage: SubScribePage = {
      data: result.data.content.map(
        (item) =>
          ({
            subscribeId: item.subscribeId,
            partnerId: item.partnerId,

            subscribeDate: item.subscribeDate,
            subscriberId: item.subscribeId,
            subscriberName: item.subscriberName,
            subscriberPhone: item.subscriberPhone,
            location: item.location,
            deliveryMemo: item.deliveryMemo,
            totalPayment: item.totalPayment,
            orderCheck: item.orderCheck,
            createdTime: item.createdTime,
            details: item.details,
          } as Subscribe)
      ),
      isLast: result.data.last,
      page: result.data.number,
      pageSize: result.data.size,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
    };

    console.log(subscribePage);

    if (subscribeArray.length < result.data.content.length) {
      yield put(initialNextSubscribe(subscribePage));
    }
  } catch (e: any) {
    yield put(endProgress());

    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* fetchNextSubscribePage(action: PayloadAction<SubscribePageRequest>) {
  yield console.log("--fetchNextData--");

  const partnerId = action.payload.partnerId;
  const page = action.payload.page;
  const size = action.payload.size;

  const subscribeArray: Subscribe[] = yield select(
    (state: RootState) => state.subscribe.data
  );

  localStorage.setItem("subscribe_page_size", size.toString());

  yield put(startProgress());

  try {
    const result: AxiosResponse<SubscribePageResponse> = yield call(
      subScribeApi.fetch,
      partnerId,
      page,
      size
    );

    console.log(result.data);

    yield put(endProgress());

    const subscribePage: SubScribePage = {
      data: result.data.content.map(
        (item) =>
          ({
            subscribeId: item.subscribeId,
            partnerId: item.partnerId,

            subscribeDate: item.subscribeDate,
            subscriberId: item.subscribeId,
            subscriberName: item.subscriberName,
            subscriberPhone: item.subscriberPhone,
            location: item.location,
            deliveryMemo: item.deliveryMemo,
            totalPayment: item.totalPayment,
            orderCheck: item.orderCheck,
            createdTime: item.createdTime,
            details: item.details,
          } as Subscribe)
      ),
      isLast: result.data.last,
      page: result.data.number,
      pageSize: result.data.size,
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
    };

    console.log(subscribePage);

    yield put(initialNextSubscribePage(subscribePage));
  } catch (e: any) {
    yield put(endProgress());

    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

export default function* subscribeSaga() {
  yield takeLatest(requestFetchSubscribe, fetchNextData);
  yield takeLatest(requestFetchNextSubscribe, fetchNextSubscribePage);
}
