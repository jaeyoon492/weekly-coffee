package com.weeklycoffee.partner.domain.subscribe.subscribeDetail;

import com.weeklycoffee.partner.domain.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(SubscribeDetailId.class)
public class SubscribeDetail {
    @Id
    private long subscribeId;

    @Id
    private int seq;

    @ManyToOne
    @Cascade(value = CascadeType.DELETE)
    private Product product;

    private long partnerId;
    private String productName;
    private int productPrice;
    private int beanAmount;
    private int term;
    private int orderQuantity;
    private String groundPoint;
    private String productImageUrl;
}
