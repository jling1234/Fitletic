package com.fitletic.spring.Entity.Meals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Nutrient {
    private String name;
    private String amount;
    private String unit;
}
