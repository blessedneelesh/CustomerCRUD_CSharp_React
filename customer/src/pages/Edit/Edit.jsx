import React, { useEffect, useState } from "react";
import { Button, Select, Form, Input, message } from "antd";
import { Spinner } from "../../components";
import { useData } from "../../DataContext";

const Edit = (props) => {
  const [states, setStates] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const { editCustomer, getState } = useData();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(props.editData.CustomerId, "hhhhhhh");
    try {
      setIsBtnLoading(true);
      const response = await editCustomer(props.editData.customerId, values);
      console.log(response, "response from editCustomer");
      messageApi.open({
        type: "success",
        content: response.data,
      });
      //form.resetFields();
      props.callBackFunc();
      setIsBtnLoading(false);
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

  useEffect(() => getStates, []);

  return (
    <>
      <Form
        //form={form}
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
          ...props.editData,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
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
          name="address"
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
          name="city"
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
            name="stateCode"
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
          name="zipCode"
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

export default Edit;
