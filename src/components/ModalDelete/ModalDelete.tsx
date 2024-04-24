import React from 'react';
import Overlay from '../Overlay';
import Close from '../../assets/actionIcons/close.svg';
import { DeleteFormProps } from '../../interfaces';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 540px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  padding-top: 4px;
  color: #211f33;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Icon = styled.img`
  display: flex;
  width: 14px;
  height: 14px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #211f33;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormBody = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Label = styled.label`
  color: #211f33;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  line-height: 14px;
`;

const ButtonText = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const ButtonDelete = styled(Button)`
  border-radius: 4px;
  background: var(--error-100, #D53948);
  color: #fff;
`;

const ButtonCancel = styled(Button)`
  border: 1px solid rgba(72, 68, 105, 0.25);
  background-color: #fff;
  color: #000;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  .button-disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ModalDelete: React.FC<DeleteFormProps> = ({open, onClose, onDelete, device}) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDelete(device.id);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <Overlay>
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>Delete device?</ModalTitle>
          <Icon src={Close} onClick={onClose} />
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormBody>
            <FormGroup>
              <Label>You are about to delete the device <strong>{device.system_name}</strong> This action cannot be undone.</Label>
            </FormGroup>
          </FormBody>
          <FormFooter>
            <ButtonCancel type="button" onClick={onClose}>
              <ButtonText>Cancel</ButtonText>
            </ButtonCancel>
            <ButtonDelete type="submit">
              <ButtonText>Delete</ButtonText>
            </ButtonDelete>
          </FormFooter>
        </Form>
      </ModalWrapper>
    </Overlay>
  );
};

export default ModalDelete;