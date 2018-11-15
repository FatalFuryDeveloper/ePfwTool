/**
 * @type    service
 * @name    I18nFactory
 * @desc    Este servicio actualiza el idioma actual donde el usuario final esta trabajando por las aplicaciones.
 * @autor   Mauro Xavier Rivera Rasury (fatalfurydeveloper)
 * @email   fatalfurydeveloper@gmail.com
 * @since   01-09-2018
 * @version 1.0
 */
(function(angular) {
  'use strict';

  angular.module("sri").factory("I18nFactory", I18nFactory);

  I18nFactory.$inject = ['$translate', '$q'];

  function I18nFactory($translate){
    /**
    * @author [aafc120216]
    * @description Traducción instantanea de Textos
    * @param {string} traduccionId Id de la Traducción
    * @param {object} parametros Objeto parametros
    * return {string} Mensaje de la traducción
    */
    function i18nTraduccion(traduccionId, parametros){
      return $translate.instant(traduccionId, parametros);
    }

    /**
    * @author [aafc120216]
    * @description Traducción instantanea de Textos
    * @param {string} traduccionId Id de la Traducción
    * @param {object} parametros Objeto parametros
    * return {string} Mensaje de la traducción
    */
    function i18nTraducirJson(lista){
      var listaRetorno = [];
      angular.forEach(lista, function(value,key){
        listaRetorno.push( "'"+key+"':'" +i18nTraduccion(value)+"'");
      });
      return separarLista(listaRetorno);
    }

    /**
     * @author Mauro Xavier Rivera Rasury (mjrr210316)
     * @description Funcion para separar la lista seleccionada en tabla
     * @param {lista} [lista] [lista seleccionada]
     * @returns cadena
     */
    function separarLista(lista) {
      var listaFormateada = JSON.stringify(lista);
      var patron1 = /':'/gi;
      var patron2 = /'","'/gi;
        listaFormateada = listaFormateada.replace(patron1, '":"');
        listaFormateada = listaFormateada.replace(patron2, '","');
        listaFormateada = listaFormateada.replace('["\'', '{"');
        listaFormateada = listaFormateada.replace('\'"]', '"}');
        return JSON.parse(listaFormateada);
    }

    function CambiarIdiomaPagina(idioma){
      angular.element('html').attr('lang', idioma);
    }

    /**
     * Permite la traducción del placeholder de un Combo
     * Ejemplo:
     * i18nFactory.i18nCombo('APP.MODULOS.DIS.CATALOGOS.TIPOSFORMULARIO','cmbTipoFormulario');
     * @param {string} traduccionId
     * @param {string} comboId
     * @returns void
     */
    function i18nCombo(traduccionId, comboId){
      var mensajeTraducido = $translate.instant(traduccionId);
        angular.element('input[aria-owns='+comboId+'_listbox]').attr('placeholder', mensajeTraducido);
    }

    /**
     * La estructura del Arreglo de Combox de kendo
     * El arreglo de entrada debe estar descrito de la siguiente manera:
     * [{
     *      traduccionId: "Id de Traduccion",
     *      comboId: "Id del Combo de KendoUI"
     * }]
     * @param {Array} listaCombos
     * @returns void
     */
    function i18nCombos(listaCombos){
      listaCombos.forEach(function(elemento){
        i18nCombo(elemento.traduccionId, elemento.comboId);
      });
    }

    /**
     * Se obtiene el idioma para procesar la petición
     * @returns {String} Idioma de la petición
     */
    function idiomaPeticion(){
      var lang = angular.element('html').attr('lang'),
          idioma = (lang === 'es')?"ESP":((lang === 'en')?"ING":"QUI");
      return idioma;
    }

    /**
     * Se obtiene el idioma para la página
     *
     * @returns {String} Idioma de la página
     */
    function idiomaPgina(){
      return angular.element('html').attr('lang');
    }

    /**
     * Permite la traducción del placeholder de un DropDownList
     * Ejemplo:
     *
     * i18nFactory.i18nDropDownList('APP.MODULOS.DIS.CATALOGOS.TIPOSFORMULARIO','ddlTipoFormulario');
     *
     * @param {string} traduccionId
     * @param {string} dropDownListId
     * @returns void
     */
    function i18nDropDownList(traduccionId, dropDownListId){
      $translate(traduccionId).then(function(mensajeTraducido){
        angular.element('span[aria-owns='+dropDownListId+'_listbox] span.k-input').html(mensajeTraducido);
      });
    }

    return {
      i18nTraduccion: i18nTraduccion,
      i18nTraducirJson: i18nTraducirJson,
      cambiarIdiomaPagina: CambiarIdiomaPagina,
      i18nCombo: i18nCombo,
      i18nCombos: i18nCombos,
      idioma: idiomaPgina,
      i18nDropDownList: i18nDropDownList,
      idiomaPeticion: idiomaPeticion
    };
  }
}(window.angular));