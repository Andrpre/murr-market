import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
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

const { Option } = Select;

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const orderStatus = useSelector(selectOrderStatus);

  const [form] = Form.useForm();

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
        notification.success({
          message: "Заказ успешно оформлен!",
        });
        navigate("/");
      })
      .catch(() => {
        notification.error({
          message: "Ошибка при оформлении заказа!",
        });
      });
  };

  return (
    <div>
      <BreadCrumb titles={[{ name: "Корзина", link: "/cart" }, { name: "Оформление заказа" }]} />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{ paymentMethod: "murrcoins" }}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Введите имя" },
          ]}
        >
          <Input placeholder="Имя" variant="filled" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Введите почту" },
            {
              type: "email",
              message: "Некорректная почта",
            },
          ]}
        >
          <Input placeholder="Почта" variant="filled" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            { required: true, message: "Введите адрес" },
          ]}
        >
          <Input placeholder="Адрес" variant="filled" />
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
            placeholder="Введите ваш телефон"
            variant="filled"
          />
        </Form.Item>

        <Form.Item
          label="Способ оплаты"
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Выберите способ оплаты",
            },
          ]}
        >
          <Select>
            <Option value="murrcoins">Мурркоины</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={orderStatus === RequestStatus.Loading}
          >
            Оформить заказ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckoutPage;
