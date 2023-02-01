import useEditRecord from "~/composables/useEditRecord";

const records = ref([]);
const recordsAlreadyLoaded = ref(false);

export default async () => {
  const client = useSupabaseClient();
  const { user } = await useUser();
  const { resetEditedRecord } = useEditRecord();

  const getAllRecords = async () => {
    try {
      const recordFromService = await client
        .from("first")
        .select()
        .contains("people", [user.value?.email]);

      records.value = recordFromService.data || [];

      recordsAlreadyLoaded.value = true;
    } catch (error) {
      console.error("getAllRecords", error);
    }
  };
  const addNewRecord = async ({ record, recordWith }) => {
    const { data, error } = await client.from("first").upsert(record).select();

    if (data) {
      records.value.push(...data);
      navigateTo(`/dashboard/${recordWith}`);
    }

    if (error) {
      console.log("add new record error", error);
    }
  };

  const uniqueUsers = computed(() => {
    if (!user.value) {
      return [];
    }
    const users = records.value.map(
      (deal) => deal.people.filter((person) => person !== user.value.email)[0]
    );

    return Array.from(new Set(users)) || [];
  });

  const hasRecords = computed(() => uniqueUsers.value.length !== 0);

  const deleteRecord = async (id) => {
    const { error } = await client.from("first").delete().eq("id", id);

    if (error) {
      console.log("delete record error", error);
    } else {
      records.value = records.value.filter((record) => record.id !== id);
    }
  };

  const updateRecords = (updatedRecord) => {
    const updatedRecordIndex = records.value.findIndex(
      (record) => record.id === updatedRecord.id
    );

    records.value[updatedRecordIndex] = updatedRecord;
  };

  const editRecord = async ({ record, recordWith }) => {
    const { people, title, number, currency, id } = record;
    const { error } = await client
      .from("first")
      .update({ people, title, number, currency })
      .eq("id", id);

    if (error) {
      console.log("delete record error", error);
    } else {
      updateRecords(record);
      navigateTo(`/dashboard/${recordWith}`);
      resetEditedRecord();
    }
  };

  return {
    getAllRecords,
    records,
    addNewRecord,
    recordsAlreadyLoaded,
    uniqueUsers,
    deleteRecord,
    editRecord,
    hasRecords,
  };
};
