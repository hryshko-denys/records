import { RecordInt } from "~/types/Record";
import { Ref } from "vue";

const editedRecord: Ref<null | RecordInt> = ref(null);
export default () => {
  const setEditedRecord = async (record: RecordInt) => {
    editedRecord.value = record;

    await navigateTo("/dashboard/edit-record");
  };

  const resetEditedRecord = () => {
    editedRecord.value = null;
  };

  return { setEditedRecord, resetEditedRecord, editedRecord };
};
