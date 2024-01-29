import React, { useEffect, useState } from "react";
import { useData } from "../../DataContext";
import { Table, Button, Space, Modal, message, Popconfirm } from "antd";
import { Spinner } from "../../components/UI";
import { Add } from "../Add";
import { Edit } from "../Edit";

function List() {
  const [data, setData] = useState([]);
  console.log(data, "data");
  const [isLoading, setIsLoading] = useState(false);
  const [editedDataProp, setEditedDataProp] = useState([]);

  const { getAllCustomers, deleteCustomer, getCustomerById } = useData();

  const getcust = async () => {
    setIsLoading(true);
    let lst = await getAllCustomers();
    lst.forEach((row, index) => {
      index = index + 1;
      console.log(row);
      row["index"] = index;
    });
    setData(lst);
    setIsLoading(false);
    console.log(lst, "neelesh");
  };

  const confirm = async (id) => {
    console.log(id);
    try {
      let result = await deleteCustomer(id);
      getcust();
      message.success(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Not Deleted!");
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    getcust();
    message.info("Successfully Added");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // getcust();
  };

  const showEditModal = async (id) => {
    console.log(id, "from list edit id");
    try {
      let result = await getCustomerById(id);

      setEditedDataProp(result);
      console.log(editedDataProp, "after");
    } catch (e) {
      console.log(e);
    }

    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
    getcust();
    message.info("Successfully Edited");
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  useEffect(() => getcust, []);

  const columns = [
    {
      title: "SN",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "Address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "City",
    },
    {
      title: "StateCode",
      dataIndex: "stateCode",
      key: "StateCode",
    },
    {
      title: "ZipCode",
      dataIndex: "zipCode",
      key: "ZipCode",
    },
    {
      title: "Action",
      key: "Action",
      render: (rec) => (
        <>
          <Space>
            <Button
              type="primary"
              onClick={() => showEditModal(rec.customerId)}
            >
              Edit
            </Button>
            <Modal
              title="Edit"
              open={isEditModalOpen}
              onOk={handleEditOk}
              onCancel={handleEditCancel}
              footer={null}
              destroyOnClose={true}
            >
              <Edit editData={editedDataProp} callBackFunc={handleEditOk} />
            </Modal>

            <Popconfirm
              title="Delete"
              description="Are you sure to delete this customer?"
              onConfirm={() => confirm(rec.customerId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: "right", margin: "5px" }}>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>
      <Modal
        title="Add"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Add callBackFunc={handleOk} />
      </Modal>

      {!isLoading ? (
        <div>
          <Table columns={columns} dataSource={data} size="small" />
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </>
  );
}

export default List;
