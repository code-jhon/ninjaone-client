import styled from 'styled-components';
import Overlay from '../Overlay';
import close from '../../assets/actionIcons/close.svg';
import { useState } from 'react';
import { Device } from '../../interfaces';

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

const Input = styled.input`
  height: 37px;
  border: 1px solid rgba(72, 68, 105, 0.25);
  border-radius: 4px;
  display: flex;
  padding: 8.5px 12px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  font-family: Inter;
  font-size: 14px;
`;

const Select = styled.select`
  height: 38px;
  width: 100%;
  display: flex;
  padding: 7px 12px;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  border: 1px solid var(--Secondary-Secondary-25, #d1d0d9);
  color: var(--Black-Black-65, #6e6d7a);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
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

const ButtonSubmit = styled(Button)`
  background: #337ab7;
  color: #fff;
  border: none;
`;

const ButtonCancel = styled(Button)`
  border: 1px solid rgba(72, 68, 105, 0.25);
  background-color: #fff;
  color: #337ab7;
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

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (device: Device) => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const initialFormData: Device = {
    id: '',
    system_name: '',
    type: '',
    hdd_capacity: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    validateForm()
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!isValid) return;
    if(isValid) {
      onSubmit(formData);
      setFormData(initialFormData);
      onClose();
    }
  };

  const validateForm = () => {
    setIsValid(
      formData.system_name !== '' &&
        (formData.type === 'WINDOWS' || formData.type === 'LINUX' || formData.type === "MAC") &&
        formData.hdd_capacity !== ''
    );
  }

  if (!open) {
    return null;
  }

  return (
    <Overlay>
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>Add device</ModalTitle>
          <Icon src={close} onClick={onClose} />
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormBody>
            <FormGroup>
              <Label> System name * </Label>
              <Input
                type="text"
                required
                name="system_name"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label> Device type * </Label>
              <Select required name="type" onChange={handleChange}>
                <option value="">Select type</option>
                <option value="LINUX">Linux workstation</option>
                <option value="MAC">Mac workstation</option>
                <option value="WINDOWS">Windows workstation</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label> HDD capacity (GB) * </Label>
              <Input
                type="number"
                required
                name="hdd_capacity"
                onChange={handleChange}
              />
            </FormGroup>
          </FormBody>
          <FormFooter>
            <ButtonCancel type="button" onClick={onClose}>
              <ButtonText>Cancel</ButtonText>
            </ButtonCancel>
            <ButtonSubmit type="submit" disabled={!isValid} className={!isValid ? 'button-disabled' : ''}>
              <ButtonText>Submit</ButtonText>
            </ButtonSubmit>
          </FormFooter>
        </Form>
      </ModalWrapper>
    </Overlay>
  );
};

export default ModalForm;
