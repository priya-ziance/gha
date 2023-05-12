// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { BreadcrumbProps, Intent, Label } from "@blueprintjs/core";
import { Button, Col, PageHeading, Row, Switch } from "../../../components";
import URLS from "../../../utils/urls";

import "./index.scss";

const Payment = () => {
  const { user } = useAuth0();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const url = "https://stripe.com/docs/api/plans/list";
    window.open(url, "_blank")?.focus();
  };

  const BREADCRUMBS: BreadcrumbProps[] = [
    {
      href: URLS.getPagePath("dashboard"),
      icon: "document",
      text: URLS.getPagePathName("dashboard"),
    },
    { text: URLS.getPagePathName("payment") },
  ];

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
        <div className="btn__submit-container">
          <Button
            type="submit"
            disabled={false}
            intent={Intent.PRIMARY}
            large
            onClick={handleSubmit}
          >
            <b>{"Go to Subscription"}</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
