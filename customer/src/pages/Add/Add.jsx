import React, { useEffect, useState } from "react";
import { Button, Select, Form, Input, message } from "antd";
import { useData } from "../../DataContext";
import { Spinner } from "../../components";

const Add = (props) => {
  const { addCustomer, getState, getAllCustomers } = useData();

  const [states, setStates] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setIsBtnLoading(true);
      const response = await addCustomer(values);
      messageApi.open({
        type: "success",
        content: response.data,
      });

      setIsBtnLoading(false);
      props.callBackFunc();
      //getAllCustomers();
    } catch (error) {
      console.log(error, "error");
      messageApi.open({
        type: "error",
        content: "Cannot be added!",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getStates = async () => {
    var data = await getState();
    setStates(data);
    setIsLoading(false);
  };
  console.log(states, "FROM addddd jsx");
  useEffect(() => getStates, []);
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="Address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="City"
          rules={[
            {
              required: true,
              message: "Please input your city!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {!isLoading ? (
          <Form.Item
            label="State"
            name="StateCode"
            rules={[
              {
                required: true,
                message: "Please input your state!",
              },
            ]}
          >
            <Select>
              {states.map((state) => (
                <Select.Option value={state.stateCode}>
                  {state.stateName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <Spinner />
        )}

        <Form.Item
          label="ZipCode"
          name="ZipCode"
          rules={[
            {
              required: true,
              message: "Please input your zipcode!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {contextHolder}
          <Button type="primary" htmlType="submit" loading={isBtnLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Add;
