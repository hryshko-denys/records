const records = ref([]);

export default () => {
  const client = useSupabaseClient();
  const { user } = useUser();

  const getAllRecords = async () => {
    const recordFromService = await client
      .from("first")
      .select()
      .contains("people", [user.value?.email]);
    console.log(recordFromService);

    records.value = recordFromService.data || [];
  };
  const addNewRecord = async (record, recordWith) => {
    console.log(record, "newRecord");
    const { data, error } = await client.from("first").upsert(record).select();

    if (data) {
      records.value.push(...data);
      navigateTo(`/dashboard/${recordWith}`);
    }

    if (error) {
      console.log("SHOW error");
    }

    console.log(data, error);
  };

  return { getAllRecords, records, addNewRecord };
};
