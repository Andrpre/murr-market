import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  notification,
  Radio,
  Space,
  RadioChangeEvent,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  OrderData,
  RequestStatus,
} from "../../utils/types";
import {
  useDispatch,
  useSelector,
} from "../../services/hooks";
import {
  submitOrder,
  selectCartItems,
  selectOrderStatus,
  selectTotalAmount,
} from "../../slices/cartSlice";

import { BreadCrumb } from "../../components/ui/bread-crumb";
import { RadioButton } from "../../components/ui/radio-button";
import styles from "./style.module.scss";

export const CheckoutPage: React.FC = () => {
  const [api, contextHolder] =
    notification.useNotification();
  const [value, setValue] = useState("murrcoins");
  const [submittable, setSubmittable] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const orderStatus = useSelector(selectOrderStatus);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const openNotification = () => {
    api.error({
      message: "Ошибка при оформлении заказа",
      description:
        "Мы уже занимаемся решением проблемы. Попробуйте пожалуйста позже.",
    });
  };

  const handleFormSubmit = (values: {
    name: string;
    email: string;
    address: string;
    phone: string;
    paymentMethod: string;
  }) => {
    const orderData: OrderData = {
      name: values.name,
      email: values.email,
      address: values.address,
      phone: values.phone,
      paymentMethod: values.paymentMethod,
      items: cartItems,
      totalAmount,
    };
    dispatch(submitOrder(orderData))
      .unwrap()
      .then(() => {
        navigate("/checkout/success", {
          state: { orderData },
        });
      })
      .catch(() => {
        openNotification();
      });
  };

  return (
    <>
      {contextHolder}
      <Helmet>
        <title>Оформление заказа | Murr Market</title>
      </Helmet>
      <BreadCrumb
        titles={[
          { name: "Корзина", link: "/cart" },
          { name: "Оформление заказа" },
        ]}
      />
      <section className={styles.checkout}>
        <Form
          className={styles.checkout__form}
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          aria-label="Форма оформления заказа"
        >
          <h3>Заполните данные</h3>
          <section
            className={styles.checkout__inputs}
            aria-label="Заполните данные"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Введите имя" },
              ]}
            >
              <Input
                placeholder="Имя"
                variant="filled"
                size="large"
                aria-label="Имя"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Введите почту",
                },
                {
                  type: "email",
                  message: "Некорректная почта",
                },
              ]}
            >
              <Input
                placeholder="Почта"
                variant="filled"
                size="large"
                aria-label="Почта"
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Введите адрес",
                },
              ]}
            >
              <Input
                placeholder="Адрес"
                variant="filled"
                size="large"
                aria-label="Адрес"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Введите номер телефона",
                },
                {
                  pattern: /^[0-9+()\- ]{10,}$/,
                  message: "Некорректный телефон",
                },
              ]}
            >
              <Input
                placeholder="Телефон"
                variant="filled"
                size="large"
                aria-label="Телефон"
              />
            </Form.Item>
          </section>

          <h3>Способ оплаты</h3>
          <section aria-label="Способ оплаты">
            <Form.Item
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: "Выберите способ оплаты",
                },
              ]}
            >
              <Radio.Group
                onChange={onChange}
                value={value}
                size="large"
              >
                <Space wrap>
                  <RadioButton value="murrcoins">
                    Мурркоины €
                  </RadioButton>
                </Space>
              </Radio.Group>
            </Form.Item>
          </section>

          <Form.Item
            className={styles.checkout__form__button}
          >
            <Button
              disabled={!submittable}
              type="primary"
              htmlType="submit"
              loading={
                orderStatus === RequestStatus.Loading
              }
            >
              Оформить заказ
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};
