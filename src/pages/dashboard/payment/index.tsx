// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { BreadcrumbProps, Intent, Label } from "@blueprintjs/core";
import { useState } from "react";
import { Button, Col, PageHeading, Row, Switch } from "../../../components";
import URLS from "../../../utils/urls";

import "./index.scss";

const Payment = () => {
  const { user } = useAuth0();
  const [isOneTimePayment, setIsOneTimePayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [cvv, setCvv] = useState("");

  

  const onChange = (setterMethod: any, value: any) => {
    setterMethod(value);
  };

  const onExpiryChange = (e: any) => {
    const value = e.target.value;
    let newValue = value.replace(/\D/g, ""); // remove non-numeric characters
    if (newValue.length > 4) {
      newValue = newValue.slice(0, 4); // limit input to 4 characters
    }
    setExpiryMonth(newValue);
  };

  const onCardInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ');
    value = value.trim();
    value = value.slice(0, 19);
    setCardNumber(value)
  }

  const handleSubmit = (e: any) => {
  const url = 'https://stripe.com/docs/api/plans/list';
    e.preventDefault();
    if (isOneTimePayment) {
      // card processing
    } else {
      window.open(url, '_blank')?.focus(); 
    }
  };

  const BREADCRUMBS: BreadcrumbProps[] = [
    {
      href: URLS.getPagePath("dashboard"),
      icon: "document",
      text: URLS.getPagePathName("dashboard"),
    },
    { text: URLS.getPagePathName("payment") },
  ];

  const formattedExpiry = expiryMonth?.match(/.{1,2}/g)?.join("/")?.substr(0, 5) || '';

  return (
    <div className="payment">
      <PageHeading title="Payment Info" breadCrumbs={BREADCRUMBS} />
      <div className="payment__container">
        <Row>
          <Col xs={12} md={2}>
            <Label> {`Name:`}</Label>
          </Col>
          <Col xs={12} md={10}>
            <Label> {`${user?.name || ""}`}</Label>
          </Col>

          <Col xs={12} md={2}>
            <Label> {`Email:`}</Label>
          </Col>
          <Col xs={12} md={10}>
            <Label> {`${user?.email || ""}`}</Label>
          </Col>
        </Row>
        <div className="one-time-pay-class">
          <label>One Time Payment: </label>
          <Switch
            id="oneTimePayment"
            large
            className="payment-switch"
            checked={isOneTimePayment}
            onChange={() => setIsOneTimePayment(!isOneTimePayment)}
          />
        </div>
        {isOneTimePayment && <div className="card-payment">
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              placeholder = {'4242 4242 4242 4242'}
              onChange={onCardInputChange}
            />
          </label>
          <label>
            Expiry:
            <input
              type="text"
              placeholder="MM/YY"
              value={formattedExpiry}
              onChange={onExpiryChange}
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              placeholder='123'
              onChange={(e) => onChange(setCvv, e.target.value)}
            />
          </label>
        </div>}
        <div className="btn__submit-container">
          <Button type="submit" disabled={false} intent={Intent.PRIMARY} large onClick={handleSubmit}>
            <b>{"Next"}</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
