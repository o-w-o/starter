import React from "react";
import { PreviewText } from "@formily/react-shared-components";
import {
  IConnectProps,
  MergedFieldComponentProps
} from "@formily/react-schema-renderer";
import { each } from "@formily/shared";

/**
 * 自动滚动至 第一个错误字段
 * @param formRef
 */
export const autoScrollInValidateFailed = (formRef: any) => {
  if (formRef.current) {
    setTimeout(() => {
      const elements = formRef.current.querySelectorAll(".form-item.has-error");
      if (elements && elements.length) {
        if (!elements[0].scrollIntoView) return;
        elements[0].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "center"
        });
      }
    }, 30);
  }
};

export const mapTextComponent = (
  Target: React.JSXElementConstructor<any>,
  props: any,
  fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  const { editable } = fieldProps;
  if (editable !== undefined) {
    if (editable === false) {
      return PreviewText;
    }
  }
  return Target;
};

export const transformDataSourceKey = (component, dataSourceKey) => {
  return ({ dataSource, ...others }) => {
    return React.createElement(component, {
      [dataSourceKey]: dataSource,
      ...others
    });
  };
};

export const pickProps = (object: any, targets: string[]) => {
  const selected: any = {};
  const otherwise: any = {};
  each(object, (value: any, key: string) => {
    if (targets.includes(key)) {
      selected[key] = value;
    } else {
      otherwise[key] = value;
    }
  });
  return {
    selected,
    otherwise
  };
};

export const mapStyledProps = (
  props: IConnectProps,
  fieldProps: MergedFieldComponentProps
) => {
  const { loading, errors } = fieldProps;
  if (loading) {
    props.state = props.state || "loading";
  } else if (errors && errors.length) {
    props.state = "error";
  }
};

export const compose = (...args: any[]) => {
  return (payload: any, ...extra: any[]) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra);
    }, payload);
  };
};
