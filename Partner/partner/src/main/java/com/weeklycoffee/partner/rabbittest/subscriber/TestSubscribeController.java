package com.weeklycoffee.partner.rabbittest.subscriber;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TestSubscribeController {

    private final TestSubscribeService service;

    @Autowired
    public TestSubscribeController(TestSubscribeService service) {
        this.service = service;
    }

    @PostMapping(value = "/send-subscribe")
    public SubscribeRequest sendSubscribe(@RequestBody SubscribeRequest testSubReq) {

        SubscribeRequest toSubscribe = SubscribeRequest.builder()
                .partnerId(testSubReq.getPartnerId())
                .subscribeId(testSubReq.getSubscribeId())
                .subscriberId(testSubReq.getSubscriberId())
                .subscriberName(testSubReq.getSubscriberName())
                .subscriberPhone(testSubReq.getSubscriberPhone())
                .location(testSubReq.getLocation())
                .deliveryMemo(testSubReq.getDeliveryMemo())
                .build();

        List<SubscribeRequest.SubscribeDetail> list = new ArrayList<>();
        for(SubscribeRequest.SubscribeDetail reqDetail : testSubReq.getSubscribeDetails()){
            SubscribeRequest.SubscribeDetail detail = SubscribeRequest.SubscribeDetail.builder()
                    .productId(reqDetail.getProductId())
                    .partnerId(reqDetail.getPartnerId())
                    .productName(reqDetail.getProductName())
                    .productPrice(reqDetail.getProductPrice())
                    .beanAmount(reqDetail.getBeanAmount())
                    .term(reqDetail.getTerm())
                    .orderQuantity(reqDetail.getOrderQuantity())
                    .groundPoint(reqDetail.getGroundPoint())
                    .productImageUrl(reqDetail.getProductImageUrl())
                    .build();
            list.add(detail);
        }

        toSubscribe.setSubscribeDetails(list);

        service.sendSubscribeTest(toSubscribe);

        return toSubscribe;
    }

}
