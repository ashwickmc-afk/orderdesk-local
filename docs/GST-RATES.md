# GST calculator references

OrderDesk's GST calculator is an arithmetic aid. It does not provide GST rate classification or tax advice.

The correct treatment can depend on the goods/service, HSN/SAC classification, exemptions/notifications, place and type of supply, and date of supply. Rate presets are shortcuts only; they do not imply every product belongs in those slabs.

Verify current details with official sources:
- [CBIC — GST rates for goods and services](https://cbic-gst.gov.in/gst-goods-services-rates.html)
- [CBIC — Tax Information Portal](https://taxinformation.cbic.gov.in/)
- [GST Council](https://gstcouncil.gov.in/)

For invoicing, filing, input tax credit, exemptions or disputed classification, consult a qualified tax professional.

## Calculation behaviour
- GST-exclusive: taxable value is entered price multiplied by quantity; GST is added.
- GST-inclusive: GST is extracted from the entered total using taxable value = inclusive amount / (1 + rate / 100).
- Intra-state: GST is displayed as CGST plus SGST/UTGST.
- Inter-state: GST is displayed as IGST.
- Values are rounded to two decimal places.

The owner must choose the applicable rate and supply type. The calculator does not decide either automatically.