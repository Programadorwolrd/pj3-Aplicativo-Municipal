import React, { useState, useEffect } from "react";
import { FormPaiado } from "@/components/FormConfigs";
import TAuth from "@/components/templateAuth";
import { router } from "expo-router";
import { YStack, Text, Adapt, Sheet, Select } from "tamagui";
import { useGetUser } from "@/lib/querys";
import { clientQuery } from "@/app/_layout";
import EstadoScreen from "../../../components/form/PickerCidade";
import NascimentoScreen from "@/components/form/PickerNascimento";
import PickerSexo from "@/components/form/PickerSexo";
import useApi from "@/lib/useApi";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { storeAuth } from "@/lib/logicAuth";
export default function Editar() {
  const { data: userData } = useGetUser();
  const loggout = storeAuth((s) => s.logout);

  const { mutate } = useApi("mutate", (axios) => ({
    mutationFn() {
      return axios.delete("/usuario");
    },
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleDelete = () => {
    mutate();
    loggout();
    console.log('Conta deletada');
    closeModal();
  };

  const EditForm = new FormPaiado((axios) => ({
    mutationFn: async (allValues) => {
      await axios.put("/usuario", allValues);
      clientQuery.invalidateQueries();
      router.replace("/(app)/(profile)");
    },
  }));

  if (!userData) return null;

  const user = userData.data.usuario;

  return (
    <TAuth subTitulo="Edite seus dados" titulo="EDITAR">
      <EditForm.Input campo="apelido" defaultValue={user.apelido} />
      <EditForm.Input campo="nome" defaultValue={user.nome || ""} />
      <YStack w="104%" mb="$2">
        <NascimentoScreen
          values={EditForm.values}
          defaultValue={user.nascimento || ""}
        />
        <PickerSexo values={EditForm.values} defaultValue={user.sexo || ""} />
        <EstadoScreen values={EditForm.values} />
      </YStack>
      <EditForm.ButtonSubmit text="SALVAR" />

      <YStack alignItems="center" mt="$4">
        <Text
          onPress={() => {
            router.navigate("(app)/(profile)");
          }}
          color="$green9Light"
          fontSize="$5"
          textDecorationLine="underline"
        >
          Voltar para o Perfil
        </Text>

        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Deletar Conta</Text>
        </TouchableOpacity>
      </YStack>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Deleção</Text>
            <Text style={styles.modalText}>
              Você tem certeza que deseja deletar sua conta?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TAuth>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 60,
    backgroundColor: "red",
    borderColor: "3fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  openButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 10,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
